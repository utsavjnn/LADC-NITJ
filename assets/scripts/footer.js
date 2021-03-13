


$(".mat-input").focus(function(){
    $(this).parent().addClass("is-active is-completed");
  });
  
  $(".mat-input").focusout(function(){
    if($(this).val() === "")
      $(this).parent().removeClass("is-completed");
    $(this).parent().removeClass("is-active");
  })

  function subs(name,email){
    $.ajax({
        url:`http://localhost:8000/subscribe`,
        type:"POST",
        data: {
            "name":name,
            "email":email
        },
        dataType: 'json',
        success:function(data)
        {  
           alert(data.msg);
           $("#name").val("");
           $("#email").val("");
        },
        error:function(err)
        {
          alert("Internal Server Error,try again");
          $("#name").val("");
          $("#email").val("");
        }
    })
}


function validateEmail(email) {
  console.log(email);
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


  





$("#newsbtn").click(function(){
  let name=$("#name").val();
  let email=$("#email").val();
  if(name==""||email=="")
  {
    alert("Fields cannot be empty");
  }
  else{
    if (validateEmail(email)) {
      subs(name,email);
     
    } else {
      alert('Please Enter a valid mail')

    }


 
  }
  
})  