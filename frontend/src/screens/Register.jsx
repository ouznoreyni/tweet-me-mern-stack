import React from 'react';
import { Link } from '@reach/router';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required').min(5).max(50),
  password: Yup.string().required('Required').min(5).max(50),
});

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  repeat_password: '',
};

const Register = () => {
  const onSubmit = (values) => {
    console.log('val', values);
  };
  return (
    <div className='container mx-auto'>
      <div className='flex justify-center px-6 my-12'>
        <div className='w-full lg:w-10/12 bg-white p-5 rounded-lg lg:rounded-l-none'>
          <h3 className='pt-4 text-2xl text-center'>Creer un Compte!</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
              >
                <div className='mb-4 md:flex md:justify-between'>
                  <div className='mb-4 md:mr-2 md:mb-0'>
                    <label
                      className='block mb-2 text-sm font-bold text-gray-700'
                      htmlFor='firstName'
                    >
                      Prenom
                    </label>
                    <input
                      className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      id='firstName'
                      name='firstName'
                      type='text'
                      placeholder='Prenom'
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='md:ml-2'>
                    <label
                      className='block mb-2 text-sm font-bold text-gray-700'
                      htmlFor='lastName'
                    >
                      Nom
                    </label>
                    <input
                      className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      id='lastName'
                      type='text'
                      name='lastName'
                      placeholder='Nom'
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    htmlFor='username'
                  >
                    Username
                  </label>
                  <input
                    className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='username'
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={values.username}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-4 md:flex md:justify-between'>
                  <div className='mb-4 md:mr-2 md:mb-0'>
                    <label
                      className='block mb-2 text-sm font-bold text-gray-700'
                      htmlFor='password'
                    >
                      Mot de passe
                    </label>
                    <input
                      className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      id='password'
                      type='password'
                      name='password'
                      placeholder='******************'
                      value={values.password}
                      onChange={handleChange}
                    />
                    <p className='text-xs italic text-red-500'>
                      Please choose a password.
                    </p>
                  </div>
                  <div className='md:ml-2'>
                    <label
                      className='block mb-2 text-sm font-bold text-gray-700'
                      htmlFor='repeat_password'
                    >
                      Confirmer Mot de passe
                    </label>
                    <input
                      className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      id='repeat_password'
                      type='password'
                      name='repeat_password'
                      placeholder='******************'
                      value={values.repeat_password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='mb-6 text-center'>
                  <button
                    className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Enregister
                  </button>
                </div>
                <hr className='mb-6 border-t' />
                <div className='text-center'>
                  <Link
                    className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                    to='#'
                  >
                    Mot de passe oublie
                  </Link>
                </div>
                <div className='text-center'>
                  Vous avez déjà un compte?
                  <Link
                    to='/login'
                    className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                  >
                    Connexion!
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
