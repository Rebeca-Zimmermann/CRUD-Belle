import postgres from "postgres";

const sql = postgres('postgres://postgres:senaisp@192.168.1.115:5432/Beca-Zimmer');

export default sql;