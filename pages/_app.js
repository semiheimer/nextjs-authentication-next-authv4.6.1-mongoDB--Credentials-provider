import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';
const noAuthRequired = ['/', '/auth'];
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <ToastContainer position='top-right' autoClose={2000} />
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
