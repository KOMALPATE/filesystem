$(document).ready(()=>{
  getuser();
  $("#myform").validate({
    rules:{
      username:{
        required:true,
        minlength:3
      },
      email:{
        require:true,
        email:true,
        minlength:10
      },
      mobileno:{
        require:true,
        number:true,
        minlength:10
      }
    }
  });
});
function adduser() {
  let username = $("#UserName").val();
  let email = $("#Email").val();
  let mobileno = $("#MobileNo").val();
  if(username != '' && email != '' && mobileno != ''){
  
  console.log(username, email, mobileno);
  if(username!='',email!='',mobileno!=''){
    const user={username:username,email:email,mobileno:mobileno};
  
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/user/add",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(user),
      success: function (response) {
        if(response.status==true)
        $("#UserName").val('');
        $("#Email").val('');
        $("#MobileNo").val('');
         console.log(":::::::::response::::::", response);
        $("#exampleModal").modal('hide');
        getuser();
      

      },
    });
  } 
  }else{
    if(username =='')$("#usernamerror").removeClass("d-none");
    if(email == '') $("#emailerror").removeClass("d-none");
     if(mobileno=='')$("#mobilenoerror").removeClass("d-none");
  }
 }


function getuser()
{
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/user/get",
    dataType: "json",
    contentType: "application/json",
    success: function (response) {
      console.log(":::::::::response::::::", response);
      if(response.status==true){
        $("#customerTbody").empty();
        var data=response.data;
        console.log(data);
        for(i=0;i<data.length;i++){
          let tr=`<tr><th>${[i+1]}</th><th>${data[i].username}</th><th>${data[i].email}</th><th>${data[i].mobileno}</th><th><span><i class="bi bi-pen"></i></span><span><i class="bi bi-trash"></i></span></th></tr>`;
          $("#customerTbody").append(tr);
      }
    
        
      }
    }
  })
}  
// function validationform(){
//   let username=document.myform.username.val;
  
//   if(username==null||username==''){
//     alert("name");
//     return false;
//   }
// }
// function validationemail(){
//   var i =document.myform.email.value;
//   var atposition=i.indexOf("@");
//   var dotposition=i.lastIndexOf(".");

//   if(atposition<1||dotposition<atposition+2||dotposition+2>=i.length){
//     alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);
//     return false;
//   }
// }
// function refreshtbl(){
//   $("#customerTbody").load("your-current-page.html #customerTbody")
// }
// $("#mybtn").on("click",refreshtbl);