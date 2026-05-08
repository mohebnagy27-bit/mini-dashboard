
export default function selectedbtn (btnstate, action){
    const type = action.type;
    const payload = action.payload;

    if (type === "Ntask"){
        return "Ntask";
    }
    if (type === "exams"){
        return "exams";
    }
    if (type === "Rtasks"){
        return "Rtasks";
    }
    if (type === "SHmore"){
        return "SHmore";
    }
    
    if (type === "modifiedby"){
        return "modifiedby";
    }
    if (type === "date"){
        return "date";
    }
    if (type === "completed"){
        return "completed";
    }
    if (type === "Ncompleted"){
        return "Ncompleted";
    }
}