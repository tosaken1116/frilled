import useSWR, { SWRConfiguration } from "swr";
import { BareFetcher, Key } from "swr/_internal";

export const useFetch = <
  Data = any,
  Error = any,
  SWROptions extends
    | SWRConfiguration<Data, Error, BareFetcher<Data>>
    | undefined = SWRConfiguration<Data, Error, BareFetcher<Data>> | undefined
>(
  key: Key,
  fetcher: BareFetcher<Data> | null,
  config: SWROptions = {} as SWROptions
) => {
  return useSWR(key, fetcher, {
    suspense: true,
    ...config,
  });
};
