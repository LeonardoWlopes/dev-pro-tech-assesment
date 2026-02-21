import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { api } from './api'
import { EQueryKeys } from '~/enums/keys'
import type { IOrganization } from '~/interfaces/organization'

export function useGetOrganization(): UseQueryResult<IOrganization> {
	return useQuery({
		queryKey: [EQueryKeys.ORGANIZATION],
		queryFn: async () => {
			const response = await api('/orgs/Buildbox-IT-Solutions')

			return response.data
		},
	})
}
