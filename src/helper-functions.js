export function Todaytasks (tasks){
    const todaytasks = new Date().toLocaleDateString("en-ca");
    return tasks.filter(task => task.deadline === todaytasks);
};

export function Remainingtasks (tasks){
    return tasks.filter(task => !task.completed);
}

export function Completedtasks (tasks){
    return tasks.filter(task => task.completed);
}

export function Sortedbydate (tasks){
    return [...tasks].sort((a, b) => {
        return new Date(a.deadline) - new Date(b.deadline);
    })
}

export function Getdaysleft (date){
    const today = new Date();
    const quizdate = new Date(date);

    today.setHours(0, 0, 0, 0);
    quizdate.setHours(0, 0, 0, 0);

    const diff = quizdate - today;

    return  Math.ceil(diff / (1000 * 60 * 60 * 24));
}