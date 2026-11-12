
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(q) {
    return new Promise(resolve => rl.question(q, resolve));
}

async function main() {
    console.log("\n=== TRAVEL EXPENSE REIMBURSEMENT ===\n");

    const id = (await ask("Enter Employee ID: ")).trim();
    const type = (await ask("Travel Type (Local/Outstation): ")).trim().toLowerCase();
    const distance = Number(await ask("Enter Distance in KM: "));
    const claimed = Number(await ask("Enter Claimed Amount: "));
    const documents = (await ask("Documents Submitted? (Yes/No): ")).trim().toLowerCase();

    if (!id || !["local", "outstation"].includes(type) ||
        !Number.isFinite(distance) || distance <= 0 ||
        !Number.isFinite(claimed) || claimed <= 0 ||
        !["yes", "no"].includes(documents)) {
        console.log("\nInvalid input! Please check your details.");
        rl.close();
        return;
    }

    const rate = type === "local" ? 8 : 12;
    const eligible = Math.min(distance * rate, 10000);

    let status;
    let remarks;
    let amount = 0;

    if (documents === "no") {
        status = "Rejected";
        remarks = "Supporting documents not submitted.";
    } else {
        amount = Math.min(claimed, eligible);

        if (claimed <= eligible) {
            status = "Approved";
            remarks = "Claim approved as per travel policy.";
        } else {
            status = "Partially Approved";
            remarks = "Claim exceeds the eligible reimbursement amount.";
        }
    }

    console.log("\n===== REIMBURSEMENT SUMMARY =====");
    console.log("Employee ID     :", id);
    console.log("Travel Type     :", type);
    console.log("Distance        :", distance, "KM");
    console.log("Claimed Amount  : Rs.", claimed.toFixed(2));
    console.log("Eligible Amount : Rs.", amount.toFixed(2));
    console.log("Claim Status    :", status);
    console.log("Remarks         :", remarks);
    console.log("================================");

    rl.close();
}

main();
