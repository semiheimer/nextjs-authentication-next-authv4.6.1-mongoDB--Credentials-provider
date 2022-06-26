import { useState } from 'react';
import classes from './auth-form.module.css';
import { toast } from 'react-toastify';
import { createUser } from '../../hooks/create-user';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [inputState, setInputState] = useState({ email: '', password: '' });

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const handleChange = (input) => (event) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        [input]: event.target.value,
      };
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: inputState.email,
        password: inputState.password,
      });

      if (result?.error) toast.error(result.error);
      else {
        toast.success('Login is successfull');
        router.replace('/');
      }
    } else {
      try {
        const result = await createUser(inputState.email, inputState.password);

        toast.success('User Created');
      } catch (error) {
        toast.error(error.toString());
      }
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            required
            value={inputState.email}
            onChange={handleChange('email')}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            value={inputState.password}
            onChange={handleChange('password')}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
