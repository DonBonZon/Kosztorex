import React from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import SinglePosition from "./SinglePosition";
import BottomBar from "./BottomBar";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake from "pdfmake/build/pdfmake";


function PositionsTabs() {
	const state = useSelector((state: RootState) => state.departments);

	const generetePdf = () => {
		const fs = require("fs");
		const { dialog } = require("electron").remote;
		(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;

		let docContnet:any[] = [];
		for (let i = 0; i < state.length; i++) {
			let headerAdded = false;
			let tableRows = [];
			for (let j = 0; j < state[i].positions.length; j++) {
				if (state[i].positions[j].count !== 0) {
					if (!headerAdded) {
						docContnet.push({ text: state[i].name, style: "departmentHeader" });
						tableRows.push([
							{ text: "Nazwa usługi", style: "tableHeader" },
							{ text: "Ilość", style: "tableHeader" },
							{ text: "jm", style: "tableHeader" },
							{ text: "Cena", style: "tableHeader" },
							{ text: "Dodatkowe koszta", style: "tableHeader" },
							{ text: "Suma", style: "tableHeader" },
						]); //tableHeader
						headerAdded = true;
					}
					tableRows.push([
						state[i].positions[j].name,
						state[i].positions[j].count,
						state[i].positions[j].unit,
						state[i].positions[j].price,
						state[i].positions[j].addionalCosts !== undefined
							? {
								layout: "noBorders",
								table: {
									body: state[i].positions[j].addionalCosts.filter((aditionalCost) => aditionalCost.name !== "" && aditionalCost.amount !== 0).map((aditionalCost) => [aditionalCost.name + ":", aditionalCost.calculationType === "amount" ? aditionalCost.amount + " PLN" : aditionalCost.amount * state[i].positions[j].price * state[i].positions[j].count / 100 + " PLN"]),
								},
							}
							: "0",
						state[i].positions[j].addionalCosts !== undefined ? ((state[i].positions[j].addionalCosts.filter((aditionalCost) => aditionalCost.name !== "" && aditionalCost.amount !== 0).map((addionalCost) => addionalCost.calculationType === "amount" ? addionalCost.amount : addionalCost.amount * state[i].positions[j].price * state[i].positions[j].count / 100).reduce((a, b) => a + b, 0)) + (state[i].positions[j].price * state[i].positions[j].count)).toFixed(2) : (state[i].positions[j].price * state[i].positions[j].count).toFixed(2)
					]);
				}
				if (j === state[i].positions.length - 1 && headerAdded) {
					//sprawdzenie aby dodana byla tylko 1 tabela na 1 dzial
					docContnet.push({
						table: {
							headerRows: 1,
							widths: ["*", "auto", "auto", "auto", "auto", "auto"],
							body: tableRows,
						},
					});
					docContnet.push({text: "Suma: "+getDepartmentSum(i).toFixed(2)+" PLN", alignment: 'right',style:'departmentSumLabel'})
				}
			}
			
		}
		
		docContnet.push({text: "Łącznie: "+getWholeSum().toFixed(2)+" PLN", alignment: 'right',style:'wholeSumLabel'})
		const docDefinition = {
			content: docContnet,
			styles: {
				tableHeader: {
					bold: true,
					fontSize: 13,
					color: "black",
				},
				departmentHeader: {
					bold: true,
					fontSize: 18,
					color: "black",
				},
				wholeSumLabel: {
					bold: true,
					fontSize: 15,
					color: "black",
					marginTop: 40,
				},
				departmentSumLabel: {
					fontSize: 12,
					marginTop: 5,
				},
			},
		};

		const pdf = pdfMake.createPdf(docDefinition);
		pdf.getBlob(async (blob) => {
			const buffer = Buffer.from(await blob.arrayBuffer());
			dialog
				.showSaveDialog(() => {})
				.then((file: any) =>
					file.filePath.endsWith(".pdf")
						? fs.writeFileSync(file.filePath, buffer)
						: file.filePath===""?"":fs.writeFileSync(file.filePath + ".pdf", buffer)	//sprawdzanie czy nie bylo wcisniete cancel."" nie robi nic, nie moglem dac return 
				);
		});
	};

	const getDepartmentSum = (departmentIndex:number) => {
		let sum = 0;
		for (let i = 0; i < state[departmentIndex].positions.length; i++){
			if (state[departmentIndex].positions[i].price !== 0 && state[departmentIndex].positions[i].count !== 0) {
				sum += state[departmentIndex].positions[i].price * state[departmentIndex].positions[i].count;
				if (state[departmentIndex].positions[i].addionalCosts !== undefined) {
					sum+=calcualteAdditionalCosts(departmentIndex, i);
				}
			}
		}
		return sum;
	}

	const calcualteAdditionalCosts = (departmentIndex: number, positionIndex: number) => {
		let sum = 0;
		let additionalCosts = state[departmentIndex].positions[positionIndex].addionalCosts;
		for (let i = 0;	i < additionalCosts.length;i++) {
			if (additionalCosts[i].amount !== 0 && additionalCosts[i].name !== "") {
				if (additionalCosts[i].calculationType ===	"amount"
				) {
					sum += additionalCosts[i].amount;
				} else {
					sum +=
						(state[departmentIndex].positions[positionIndex].price *
							state[departmentIndex].positions[positionIndex].count *
							additionalCosts[i].amount) /
						100;
				}
			}
		}
		return sum;
	}

	const getWholeSum = () => {
		let sum = 0;
		for (let i = 0; i < state.length; i++) {
			for (let j = 0; j < state[i].positions.length; j++) {
				if (
					state[i].positions[j].price !== 0 &&
					state[i].positions[j].count !== 0
				) {
					sum += state[i].positions[j].price * state[i].positions[j].count;
					if (state[i].positions[j].addionalCosts !== undefined) {
						sum += calcualteAdditionalCosts(i, j);
					}
				}
			}
		}
		return +sum.toFixed(2); // + z przodu aby to nie byl string tylko numer
	};

	return (
		<div id="calculatorScreenWrapper">
			<Tabs className="tab">
				{state.map((item, index) => (
					<Tab key={index} title={item.name} eventKey={item.name}>
						<h1 id="headerDepartmentName"> {item.name} </h1>
						<Table borderless>
							<tbody>
								{item.positions.map((position, positionIndex) => (
									<SinglePosition
										key={positionIndex}
										positionData={position}
										parentIndex={index}
										positionIndex={positionIndex}
									  calcualteAdditionalCosts={calcualteAdditionalCosts}
									></SinglePosition>
								))}
							</tbody>
						</Table>
					</Tab>
				))}
			</Tabs>
			<BottomBar
				getWholeSum={getWholeSum}
				generetePdf={generetePdf}></BottomBar>
		</div>
	);
}

export default PositionsTabs;
