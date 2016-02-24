# angularjs-s3-upload
this is for only upload images on s3<br>

Set this CORSConfiguration on s3 Bucket


<?xml version="1.0" encoding="UTF-8"?><br>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><br>
    <CORSRule><br>
        <AllowedOrigin>http://localhost:8080</AllowedOrigin><br>
        <AllowedOrigin>file://</AllowedOrigin><br>
        <AllowedMethod>PUT</AllowedMethod><br>
        <AllowedMethod>POST</AllowedMethod><br>
        <AllowedMethod>DELETE</AllowedMethod><br>
        <MaxAgeSeconds>3000</MaxAgeSeconds><br>
        <ExposeHeader>x-amz-server-side-encryption</ExposeHeader><br>
        <ExposeHeader>x-amz-request-id</ExposeHeader><br>
        <ExposeHeader>x-amz-id-2</ExposeHeader><br>
        <AllowedHeader>*</AllowedHeader><br>
    </CORSRule><br>
</CORSConfiguration><br>


