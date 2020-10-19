import { message } from 'antd';

const SuccessToast = (text:string,config:any = null) => {
    message.success(text);
};
const WarningToast = (text:string,config:any = null) => {
    message.warning(text);
};
const ErrorToast = (text:string,config:any = null) => {
    message.error(text);
};
const LoadingToast = () => {
    message.loading({ content: 'Loading...' })
};

export {SuccessToast,ErrorToast,LoadingToast,WarningToast}