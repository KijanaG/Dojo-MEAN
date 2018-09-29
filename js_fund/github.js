$.get("https://api.github.com/users/KijanaG", function(data){
    myName = data.name;
    document.getElementById('name').innerHTML = myName;
})