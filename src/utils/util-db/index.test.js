const { describe, it, expect, beforeEach } = require("@jest/globals");
const db = require(".");

beforeEach(() => {
    require("dotenv").config();
    db.connect(process.env.MONGODB_URI);
});

describe("Ngetes DB", () => {
    it("find harus berkerja", async () => {
        const data = await db.choose("User").find({ name: "Bambang" });

        expect.assertions(2);
        expect(data).toBeInstanceOf(Array);
        expect(data).not.toHaveLength(0);
    });
});
