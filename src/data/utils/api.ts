export async function fetchApi<T>(
  route: string,
  init?: RequestInit
): Promise<T> {
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  return fetch(process.env.NEXT_PUBLIC_APP_URL! + "/api" + cleanRoute, init)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      return res.data as T;
    });
}
