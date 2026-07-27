import { ENV_CONFIG } from "../config/env.config";

// Format date
const formatDate = (date: Date) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return formattedDate;
};


// Account Created Email Template
export const generateAccountCreatedHtml = ({
  full_name,
  email,
  createdAt,
}: {
  full_name: string;
  email: string;
  createdAt: Date;
}) => {

  const html = `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Account Created</title>
</head>

<body style="margin:0;padding:0;background:#fff5f5;font-family:Arial,Helvetica,sans-serif;color:#333;">

<table width="100%" cellspacing="0" cellpadding="0" 
style="padding:40px 16px;background:#fff5f5;">

<tr>
<td align="center">

<table width="600" cellspacing="0" cellpadding="0"
style="background:white;border-radius:16px;overflow:hidden;border:1px solid #f4c7c3;">

<!-- Header -->

<tr>
<td align="center"
style="background:#ff6347;padding:40px 20px;">

<h1 style="color:white;">
Account Created Successfully 🎉
</h1>

<p style="color:#ffeceb;">
Welcome to our platform.
</p>

</td>
</tr>


<!-- Body -->

<tr>
<td style="padding:40px 30px;">

<h2 style="color:#e74c3c;">
Hello ${full_name},
</h2>


<p>
Your account has been created successfully.
</p>


<div style="
background:#fff0ee;
padding:20px;
border-radius:10px;
">

<p>
<strong>Name:</strong> ${full_name}
</p>


<p>
<strong>Email:</strong> ${email}
</p>


<p>
<strong>Created Date:</strong> ${formatDate(createdAt)}
</p>


</div>


<div style="text-align:center;margin-top:30px;">

<a href="${ENV_CONFIG.FRONT_END_URL}/auth/login"
style="
background:#ff6347;
color:white;
padding:12px 30px;
text-decoration:none;
border-radius:8px;
">

Login

</a>

</div>


<p style="margin-top:30px;color:#666;">
If you did not create this account, please contact support.
</p>


</td>
</tr>



<!-- Footer -->

<tr>

<td align="center"
style="padding:20px;background:#fff5f5;">

<p style="font-size:13px;color:#999;">

© ${new Date().getFullYear()} Team E-Commerce

</p>

<p style="font-size:12px;color:#aaa;">
This is an automated email. Please do not reply.
</p>

</td>

</tr>


</table>

</td>
</tr>

</table>

</body>
</html>
`;

return html;

};



// Login Success Email Template

export const generateLoginSuccessHtml = ({
  full_name,
  email,
  loginAt,
  userAgent,
}: {
  full_name: string;
  email: string;
  loginAt: Date;
  userAgent: string;
}) => {


const html = `

<!DOCTYPE html>
<html>

<body style="
font-family:Arial;
background:#fff5f5;
padding:30px;
">

<div style="
background:white;
padding:30px;
border-radius:10px;
border-top:5px solid tomato;
">

<h1 style="color:#ff6347;">
Login Successful 🔐
</h1>


<h2>
Hello ${full_name}
</h2>


<p>
Your account was logged in successfully.
</p>


<div style="
background:#fff0ee;
padding:20px;
border-radius:10px;
">

<p>
<strong>Email:</strong> ${email}
</p>


<p>
<strong>Login Time:</strong> ${formatDate(loginAt)}
</p>


<p>
<strong>Device:</strong> ${userAgent}
</p>


</div>


<p style="color:#666;margin-top:20px;">
If this was not you, please change your password immediately.
</p>


<a href="${ENV_CONFIG.FRONT_END_URL}/auth/change-password"
style="
background:#ff6347;
color:white;
padding:12px 25px;
text-decoration:none;
border-radius:8px;
">

Change Password

</a>


</div>

</body>

</html>

`;


return html;

};
