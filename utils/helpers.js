export function currency(amount){

return `₦${Number(amount).toLocaleString()}`;

}

export function greeting(){

const hour=new Date().getHours();

if(hour<12) return"Good Morning";

if(hour<18) return"Good Afternoon";

return"Good Evening";

}
