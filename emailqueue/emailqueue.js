import Queue from 'bull';


export const emailqueue=new Queue(
    "email-queue",
    "redis://127.0.0.1:6379"
);
