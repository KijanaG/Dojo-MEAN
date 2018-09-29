    // Challenge #1
    let students = [
        {"name": 'Remy', "cohort": 'Jan'},
        {"name": 'Genevieve', "cohort": 'March'},
        {"name": 'Chuck', "cohort": 'Jan'},
        {"name": 'Osmund', "cohort": 'June'},
        {"name": 'Nikki', "cohort": 'June'},
        {"name": 'Boris', "cohort": 'June'}
    ];
    function Objects(obj){
        for(var i=0;i<obj.length;i++){ 
            console.log("Name: " + obj[i]['name'] + ", Cohort: " + obj[i]['cohort']);
        }
    }
    Objects(students);

    // Challenge #2
    let users = {
        employees: [
            {'first_name':  'Miguel', 'last_name' : 'Jones'},
            {'first_name' : 'Ernie', 'last_name' : 'Bertson'},
            {'first_name' : 'Nora', 'last_name' : 'Lu'},
            {'first_name' : 'Sally', 'last_name' : 'Barkyoumb'}
        ],
        managers: [
        {'first_name' : 'Lillian', 'last_name' : 'Chambers'},
        {'first_name' : 'Gordon', 'last_name' : 'Poe'}
        ]
    };

    function challengeTwo(data){
        let count = 1;
        console.log("EMPLOYEES");
        for(var i=0; i<data['employees'].length;i++){
            let temp = data['employees'][i]['last_name'].length + data['employees'][i]['first_name'].length;
            console.log(count +" – " + data['employees'][i]['last_name'] + ", " + data['employees'][i]['first_name'] + " – " + temp)
            count++;
        }
        count = 1;
        console.log("MANAGERS");
        for(var i=0; i<data['managers'].length;i++){
            let temp = data['managers'][i]['last_name'].length + data['managers'][i]['first_name'].length;
            console.log(count + " – " + data['managers'][i]['last_name'] + ", " + data['managers'][i]['first_name'] + " – " + temp)
            count++; 
        }
    }
    challengeTwo(users);