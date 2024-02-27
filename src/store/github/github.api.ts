import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IRepo, IUser, ServerResponse, SortType } from "../../models/models"

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com'
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({ //searcUsers - name of endpoint
      query: (search) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10
        }
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items
    }),
    getUserRepos: build.query<IRepo[], { username: string, type: SortType }>({
      query: ({ username, type }) => ({
        url: `users/${username}/repos`,
        params: {
          sort: type
        }
      })
    })
  })
})

export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi