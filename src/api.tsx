import {
	teams,
	players,
	generateArticle,
	generateTeamsArticles,
	Article,
	TeamsArticle,
	Player,
	Teams,
	Team,
} from './dummy-data';

/**
 * Functions to interact with dummy data or real API
 */

let cachedPlayers: Array<Player> | null = null;
const cachedTeams: Teams = {};
let cachedTeamNames: Array<string> | null = null;

export function getPlayers(teamId: string | void): Promise<Array<Player>> {
	return new Promise((res) => {
		if (cachedPlayers === null) {
			cachedPlayers = players;
			return setTimeout(
				(): void =>
					res(
						teamId
							? teams[teamId].players
							: (cachedPlayers as Array<Player>)
					),
				800
			);
		}

		return res(teamId ? teams[teamId].players : cachedPlayers);
	});
}

export function getTeam(teamId: string): Promise<Team> {
	return new Promise((res) => {
		if (typeof cachedTeams[teamId] === 'undefined') {
			cachedTeams[teamId] = teams[teamId];
			return setTimeout((): void => res(cachedTeams[teamId]), 800);
		}

		return res(cachedTeams[teamId]);
	});
}

export function getTeamNames(): Promise<Array<string>> {
	return new Promise((res) => {
		if (cachedTeamNames === null) {
			cachedTeamNames = Object.keys(teams);
			return setTimeout(
				(): void => res(cachedTeamNames as Array<string>),
				400
			);
		}

		return res(cachedTeamNames);
	});
}

export function getArticle(teamId: string, id: string): Promise<Article> {
	return new Promise((res) => {
		setTimeout((): void => res(generateArticle(teamId, id)), 700);
	});
}

export function getTeamsArticles(teamId: string): Promise<Array<TeamsArticle>> {
	return new Promise((res) => {
		setTimeout((): void => res(generateTeamsArticles(teamId)), 700);
	});
}
