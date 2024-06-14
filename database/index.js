import { connect } from "mongoose";

const mongoUri = "mongodb://localhost:27017/3npm_project";

class Database {
    static connect() {
        return connect(mongoUri);
    }
}

export default Database;
