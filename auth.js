const SUPABASE_URL = 'https://xxsmolqcwbvitmryfgfa.supabase.co';

const SUPABASE_ANON_KEY = 'sb_publishable_ejNWxFkpYXoMrjpL0GZtuQ_PvCd1k5f';

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// SIGN UP
// ===============================

async function signUp(){

  const email =
    document.getElementById('signup_email').value;

  const password =
    document.getElementById('signup_password').value;

  const { data, error } =
    await supabaseClient.auth.signUp({

      email,
      password

    });

  if(error){

    alert(error.message);

    return;

  }

  alert('Account created successfully');

  window.location.href = '/';

}

// ===============================
// LOGIN
// ===============================

async function login(){

  const email =
    document.getElementById('login_email').value;

  const password =
    document.getElementById('login_password').value;

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({

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

  window.location.href = '/';

}

// ===============================
// LOGOUT
// ===============================

async function logout(){

  await supabaseClient.auth.signOut();

  localStorage.removeItem('carra_user');

  location.reload();

}