let payAmount = document.getElementById('amount');
let payBtn = document.getElementById('payBtn');

payBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    $.ajax({
        url: 'http://localhost:8080/',
        type: "POST",
        data: JSON.stringify({
            "studentID": window.Person.studentID, // 用户名，如学号/一卡通
            "amount": payAmount.value       // 存款金额
        }),
        contentType: 'application/json',
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status == 200){
                document.querySelector('.pay_sucess').classList.remove('none');
                document.querySelector('.balance>span').innerHTML = response.balance;
                let t=setTimeout("document.querySelector('.pay_sucess').classList.add('none')",5000);
            }
        },
        error: function (error) {
            console.log(error);
            document.querySelector('.pay_failed').classList.remove('none');
            let t=setTimeout("document.querySelector('.pay_failed').classList.add('none')",5000);
        }
    });
});



