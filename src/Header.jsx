import React from 'react';
import { Stack, AppBar, Toolbar, Typography, Menu, MenuItem, Button } from '@mui/material';

export function Header(setMenuOpen, menuTriggerRef, menuOpen, onFileChange, saveFile, dataSet) {
	return (
		<AppBar color='primary'>
			<AppBar position='fixed' color='primary'>
				<Toolbar>
					<Stack direction='row' justifyContent={'space-between'} width='100%'>
						<Button edge='start' color='inherit' aria-label='menu' onClick={() => setMenuOpen(true)} ref={menuTriggerRef}>
							File
						</Button>
						<Typography variant='h6'>Metrikal</Typography>
						<span></span>
					</Stack>
					<Menu
						id='save_and_load'
						anchorEl={menuTriggerRef}
						anchorOrigin={{
							horizontal: 'left',
							vertical: 'top',
						}}
						keepMounted
						open={Boolean(menuOpen)}
						onClose={() => setMenuOpen(false)}
					>
						<MenuItem onClick={() => null}>
							<label htmlFor='loadFile'>Load file</label>
							<input hidden type='file' id='loadFile' onChange={onFileChange} />
						</MenuItem>
						<MenuItem onClick={() => saveFile(dataSet, true)}>Save</MenuItem>
						<MenuItem onClick={() => saveFile()}>Save as*</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</AppBar>
	);
}
