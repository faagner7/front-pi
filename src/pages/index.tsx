import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from '../components/Container';
import { Button } from '@material-ui/core';
import { HiArrowRight as RightIcon } from 'react-icons/hi';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Projeto Integtador IV-B</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container>
        <div style={{ flexDirection: 'column', textAlign: 'center' }}>
          <h2>Projeto Integrador</h2>
          <div>
            <Button
              variant="outlined"
              onClick={() => router.push('/customers')}
            >
              Ir para CLIENTES
              <RightIcon size={16} style={{ marginLeft: 8 }} />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
