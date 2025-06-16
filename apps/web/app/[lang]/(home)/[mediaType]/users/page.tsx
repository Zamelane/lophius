import { UserList } from '@shadcn/ui';
import { SearchInput } from '@shadcn/ui';
import { Filter } from '@shadcn/ui';
import 'tailwindcss/tailwind.css';

export default function Page () {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Пользователи</h1>
      <div className="flex justify-between mb-4">
        <SearchInput placeholder="Поиск по имени" />
        <Filter options={['Имя', 'Дата регистрации']} />
      </div>
      <UserList />
    </div>
  );
};