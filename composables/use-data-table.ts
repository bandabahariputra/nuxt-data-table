import {
  getCoreRowModel,
  useVueTable,
  type PaginationState,
  type TableOptions,
  type Updater,
} from '@tanstack/vue-table';
import { useDebounceFn } from '@vueuse/core';

interface UseDataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    'data' | 'state' | 'getCoreRowModel' | 'manualPagination'
  > {
  fetchKey: string;
  fetchFn: (req: {
    page: number;
    perPage: number;
    search?: string;
  }) => Promise<{
    data: TData[];
    total: number;
  }>;
}

export const useDataTable = <TData>(props: UseDataTableProps<TData>) => {
  const { fetchKey, fetchFn, ...tableProps } = props;

  const PAGE_KEY = 'page';
  const PER_PAGE_KEY = 'perPage';
  const SEARCH_KEY = 'search';
  const DEFAULT_PAGE = 1;
  const DEFAULT_PER_PAGE = 10;
  const DEBOUNCE_DELAY_IN_MS = 300;

  const route = useRoute();
  const router = useRouter();

  const page = ref(
    route.query[PAGE_KEY] ? Number(route.query[PAGE_KEY]) : DEFAULT_PAGE,
  );
  const perPage = ref(
    route.query[PER_PAGE_KEY]
      ? Number(route.query[PER_PAGE_KEY])
      : DEFAULT_PER_PAGE,
  );
  const search = ref(
    route.query[SEARCH_KEY] ? String(route.query[SEARCH_KEY]) : '',
  );

  const pagination = computed(() => ({
    pageIndex: page.value - 1,
    pageSize: perPage.value,
  }));

  const globalFilter = computed(() => search.value);

  const { data: response, pending: isLoading } = useAsyncData(
    fetchKey,
    () =>
      fetchFn({
        page: pagination.value.pageIndex + 1,
        perPage: pagination.value.pageSize,
        search: search.value ? String(search.value) : undefined,
      }),
    {
      watch: [pagination, search],
    },
  );

  const data = computed(() => response.value?.data ?? []);
  const pageCount = computed(() =>
    response.value?.total
      ? Math.floor(response.value.total / pagination.value.pageSize)
      : -1,
  );

  const onPaginationChange = (updaterOrValue: Updater<PaginationState>) => {
    if (updaterOrValue instanceof Function) {
      const newPagination = updaterOrValue(pagination.value);
      page.value = newPagination.pageIndex + 1;
      perPage.value = newPagination.pageSize;
    } else {
      page.value = updaterOrValue.pageIndex + 1;
      perPage.value = updaterOrValue.pageSize;
    }
  };

  const debouncedSetFilterValue = useDebounceFn((value) => {
    search.value = value;

    onPaginationChange({
      pageIndex: 0,
      pageSize: pagination.value.pageSize,
    });
  }, DEBOUNCE_DELAY_IN_MS);

  const onGlobalFilterChange = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updaterOrValue: Updater<any>,
  ) => {
    if (updaterOrValue instanceof Function) {
      const newFilter = updaterOrValue(globalFilter.value);
      debouncedSetFilterValue(newFilter);
    } else {
      debouncedSetFilterValue(updaterOrValue);
    }
  };

  watch([pagination, search], ([paginationValue, searchValue]) => {
    router.replace({
      query: {
        page: paginationValue.pageIndex + 1,
        perPage: paginationValue.pageSize,
        search: searchValue !== '' ? searchValue : undefined,
      },
    });
  });

  const table = useVueTable<TData>({
    ...tableProps,
    get data() {
      return data.value;
    },
    get pageCount() {
      return pageCount.value;
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
    onPaginationChange,
    onGlobalFilterChange,
    state: {
      get pagination() {
        return pagination.value;
      },
      get globalFilter() {
        return globalFilter.value;
      },
    },
  });

  return { table, isLoading };
};
