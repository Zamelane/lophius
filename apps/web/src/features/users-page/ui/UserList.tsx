import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Здесь вы можете добавить логику загрузки пользователей
    // Например, запрос к API или использование статических данных
    // После загрузки пользователей установите isLoading в false
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div>
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index}>
                {/* Здесь отображайте информацию о пользователе */}
              </div>
            ))
          ) : (
            <div>Нет пользователей</div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;