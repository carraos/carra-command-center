const SUPABASE_URL =
'https://xxsmolqcwbvitmryfgfa.supabase.co';

const SUPABASE_ANON_KEY =
'sb_publishable_ejNWxFkpYXoMrjpL0GZtuQ_PvCd1k5f';

const supabaseClient =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ======================================
// SIGN UP
// ======================================

async function signUp(){

  const email =
  document.getElementById(
    'auth_email'
  ).value;

  const password =
  document.getElementById(
    'auth_password'
  ).value;

  if(!email || !password){

    alert('Please enter email and password');

    return;

  }

  const { data, error } =
  await supabaseClient.auth.signUp({

    email,
    password

  });

  if(error){

    alert(error.message);

    return;

  }

  alert(
    'Account created successfully'
  );

  localStorage.setItem(
    'carra_user',
    JSON.stringify(data.user)
  );

  document.getElementById(
    'authModal'
  ).style.display='none';

}

// ======================================
// LOGIN
// ======================================

async function login(){

  const email =
  document.getElementById(
    'auth_email'
  ).value;

  const password =
  document.getElementById(
    'auth_password'
  ).value;

  if(!email || !password){

    alert('Please enter email and password');

    return;

  }

  const { data, error } =
  await supabaseClient
  .auth
  .signInWithPassword({

    email,
    password

  });

  if(error){

    alert(error.message);

    return;

  }

  localStorage.setItem(
    'carra_user',
    JSON.stringify(data.user)
  );

  document.getElementById(
    'authModal'
  ).style.display='none';

  location.reload();

}

// ======================================
// LOGOUT
// ======================================

async function logout(){

  await supabaseClient
  .auth
  .signOut();

  localStorage.removeItem(
    'carra_user'
  );

  location.reload();

}

// ======================================
// CHECK SESSION
// ======================================

async function checkSession(){

  const {
    data: { user }
  } =
  await supabaseClient
  .auth
  .getUser();

  if(user){

    localStorage.setItem(
      'carra_user',
      JSON.stringify(user)
    );

    const modal =
    document.getElementById(
      'authModal'
    );

    if(modal){

      modal.style.display='none';

    }

  }else{

    localStorage.removeItem(
      'carra_user'
    );

    const modal =
    document.getElementById(
      'authModal'
    );

    if(modal){

      modal.style.display='flex';

    }

  }

}

// ======================================
// RUN ON LOAD
// ======================================

window.addEventListener(
  'load',
  checkSession
);