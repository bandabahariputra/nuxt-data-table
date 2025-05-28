import {
  getCoreRowModel,
  useVueTable,
  type PaginationState,
  type TableOptions,
  type Updater,
} from '@tanstack/vue-table';

interface UseDataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    'data' | 'state' | 'getCoreRowModel' | 'manualPagination'
  > {
  fetchKey: string;
  fetchFn: (req: { page: number; perPage: number }) => Promise<{
    data: TData[];
    total: number;
  }>;
}

export const useDataTable = <TData>(props: UseDataTableProps<TData>) => {
  const { fetchKey, fetchFn, ...tableProps } = props;

  const PAGE_KEY = 'page';
  const PER_PAGE_KEY = 'perPage';
  const DEFAULT_PAGE = 1;
  const DEFAULT_PER_PAGE = 10;

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

  const pagination = computed(() => ({
    pageIndex: page.value - 1,
    pageSize: perPage.value,
  }));

  const { data: response, pending: isLoading } = useAsyncData(
    fetchKey,
    () =>
      fetchFn({
        page: pagination.value.pageIndex + 1,
        perPage: pagination.value.pageSize,
      }),
    {
      watch: [pagination],
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

  watch(pagination, (value) => {
    router.replace({
      query: {
        page: value.pageIndex + 1,
        perPage: value.pageSize,
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
    onPaginationChange,
    state: {
      pagination: pagination.value,
    },
  });

  return { table, isLoading };
};
