import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/react';
function ProfilePage() {
  return <UserProfile />;
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req, res: context.res });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
