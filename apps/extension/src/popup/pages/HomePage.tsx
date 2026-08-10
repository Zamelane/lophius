import { Link } from 'react-router-dom';
import { getActiveTabTitle } from '@/shared/helpers/tabs';
import { client } from '@/shared/api/client';
import { useAsync } from '@/shared/hooks';

export function HomePage() {
  const handleSendTabTitle = async () => {
    const name = (await getActiveTabTitle())?.title || 'No title';
    await client.test.post({
      name,
    });
  };

  const {execute: sendTabTitle, isPending} = useAsync(handleSendTabTitle);

  return (
    <section className="page">
      <h2 className="page__title">Home</h2>
      <button onClick={sendTabTitle} disabled={isPending}>
        {isPending ? 'Отправка...' : 'Отправить название вкладки'}
      </button>
    </section>
  );
}
