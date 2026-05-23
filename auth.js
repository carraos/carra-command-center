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
// =====================================
// CHECK USER SESSION
// =====================================

async function checkUser(){

  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  // IF USER NOT LOGGED IN

  if(!user){

    document.body.innerHTML = `

      <div style="
        background:#050816;
        color:white;
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        font-family:Inter,sans-serif;
      ">

        <h1 style="
          margin-bottom:20px;
          font-size:42px;
        ">
          🔒 Login Required
        </h1>

        <p style="
          color:#94a3b8;
          margin-bottom:30px;
        ">
          Please login to access CARRA OS
        </p>

        <button
          onclick="alert('Use Login button on dashboard')"
          style="
            background:#2563eb;
            color:white;
            border:none;
            padding:16px 26px;
            border-radius:14px;
            cursor:pointer;
            font-size:15px;
            font-weight:700;
          "
        >

          Login Required

        </button>

      </div>

    `;

  }

}

// =====================================
// RUN SESSION CHECK
// =====================================

window.addEventListener('load', async () => {

  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if(!user){

    document.body.innerHTML = `

      <div style="
        background:#050816;
        color:white;
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        font-family:Inter,sans-serif;
      ">

        <h1 style="
          margin-bottom:20px;
          font-size:42px;
        ">
          🔒 Login Required
        </h1>

        <p style="
          color:#94a3b8;
          margin-bottom:30px;
        ">
          Please login to access CARRA OS
        </p>

      </div>

    `;

  }

});