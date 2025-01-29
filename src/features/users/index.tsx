import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'

import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'

import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'
// import { userListSchema } from './data/schema'
import { users } from './data/users'
import { useApi } from '@/hooks/use-api'
import { useState, useEffect,useCallback } from 'react'

export default function Users() {
  const api = useApi(true)
  // Parse user list
  const [userList, setUserList] = useState<typeof users>(users)

  const [pagination, setPagination] = useState({
    pageIndex: 0, // 0-based index
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    api.get(`${import.meta.env.VITE_API_URL}api/v1/admin/tickets/tickets`, {
      params: {
        eventId: '2d03b30f-b752-435e-9bef-2ccc44ad19f9',
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      }
    }).then((res) => {
      setUserList(res.data.items);
      setPagination(prev => ({
        ...prev,
        total: res.data.total,
      }));
      setLoading(false);
    }).catch((error) => {
      alert('Error fetching tickets list: '+error);
      setLoading(false);
    });
  }, [pagination.pageIndex, pagination.pageSize, api]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, refreshTrigger]); // Add refreshTrigger as dependency

  return (
    <UsersProvider>
      <Header fixed>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tickets List </h2>
            <p className='text-muted-foreground'>
              Manage your tickets.
            </p>
          </div>
          {/* <UsersPrimaryButtons /> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        {loading ? (
            <div className="flex h-[500px] w-full items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <UsersTable
            data={userList}
            columns={columns}
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            totalItems={pagination.total}
            onPageChange={(newPage) => setPagination(prev => ({ ...prev, pageIndex: newPage }))}
            onPageSizeChange={(newSize) => setPagination(prev => ({
              ...prev,
              pageSize: newSize,
              pageIndex: 0 // Reset to first page
            }))}
            onRefresh={() => setRefreshTrigger(prev => prev + 1)}
            />
          )}


        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
