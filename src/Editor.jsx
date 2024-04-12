import React from 'react';
import { IconButton, TextField, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';
import { Delete as DeleteIcon, AddCircleOutline as AddIcon } from '@mui/icons-material';

export function Editor(tempPoint, setTempPoint, addPoint, dataSet, removeEntry) {
	return (
		<Table>
			{/* provide update form in tablehead */}

			<TableHead>
				<TableRow>
					<TableCell>
						<TextField
							name='year'
							label='Year'
							defaultValue={new Date().getFullYear()}
							value={tempPoint.year}
							onChange={(e) => setTempPoint((tp) => ({ ...tp, year: e.target.value }))}
						/>
					</TableCell>
					<TableCell>
						<TextField
							name='population'
							label='Population'
							step={0.01}
							value={tempPoint.population}
							onChange={(e) => setTempPoint((tp) => ({ ...tp, population: e.target.value }))}
						/>
					</TableCell>
					<TableCell>
						<IconButton aria-label='' onClick={() => addPoint(tempPoint)}>
							<AddIcon />
						</IconButton>

						<IconButton aria-label='' onClick={() => addPoint({ year: dataSet.data.at(-1).year + 1, population: Math.random() * 8.8 + 0.02 })}>
							Add Random
						</IconButton>
					</TableCell>
				</TableRow>
			</TableHead>
			{/* show datapoint in the table body */}
			<TableBody>
				{dataSet.data.map((entry) => (
					<TableRow key={JSON.stringify(entry)}>
						<TableCell>
							<TextField type='number' step={0.01} value={entry.year} label='Year' inputProps={{ readOnly: true }} />
						</TableCell>
						<TableCell>
							<TextField type='number' step={0.01} value={entry.population} label='Population' inputProps={{ readOnly: true }} />
						</TableCell>
						<TableCell>
							<IconButton aria-label='' onClick={() => removeEntry(entry.year)}>
								<DeleteIcon />
							</IconButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
