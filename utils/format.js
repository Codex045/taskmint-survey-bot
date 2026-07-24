export function money(amount){

return "₦"+Number(amount).toLocaleString();

}

export function date(time){

return new Date(time).toLocaleString();

}
