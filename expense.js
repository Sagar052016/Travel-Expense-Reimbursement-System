
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(q) {
    return new Promise(resolve => rl.question(q, resolve));
}

async function main() {
    console.log("\n=== EMPLOYEE EXPENSE REIMBURSEMENT ===\n");

    const id = (await ask("Enter Employee ID: ")).trim();
    const category = (await ask(
        "Expense Category (Travel/Accommodation/Food/Other): "
    )).trim().toLowerCase();
    const amount = Number(await ask("Enter Expense Amount: "));
    const days = Number(await ask("Enter Number of Days: "));
    const documents = (await ask(
        "Supporting Documents Submitted? (Yes/No): "
    )).trim().toLowerCase();

    const limits = {
        travel: 10000,
        accommodation: 8000,
        food: 3000,
        other: 2000
    };

    if (!id || !limits[category] ||
        !Number.isFinite(amount) || amount <= 0 ||
        !Number.isInteger(days) || days <= 0 ||
        !["yes", "no"].includes(documents)) {
        console.log("\nInvalid input! Please check your details.");
        rl.close();
        return;
    }

    let eligible = 0;
    let status;
    let remarks;

    if (documents === "no") {
        status = "Rejected";
        remarks = "Supporting documents are required.";
    } else {
        eligible = Math.min(amount, limits[category]);

        if (amount <= limits[category]) {
            status = "Approved";
            remarks = "Expense approved within category limit.";
        } else {
            status = "Partially Approved";
            remarks = "Expense exceeds the category reimbursement limit.";
        }
    }

    console.log("\n===== EXPENSE REIMBURSEMENT SUMMARY =====");
    console.log("Employee ID       :", id);
    console.log("Expense Category  :", category);
    console.log("Number of Days    :", days);
    console.log("Submitted Amount  : Rs.", amount.toFixed(2));
    console.log("Eligible Amount   : Rs.", eligible.toFixed(2));
    console.log("Reimbursement     :", status);
    console.log("Remarks           :", remarks);
    console.log("=========================================");

    rl.close();
}

main();
