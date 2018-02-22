import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../domian';

@Injectable() 
export class ProjectService {

	private readonly domain = 'projects';
	private headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

	constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

	// POST
	add(project: Project): Observable<Project> {
		project.id = null;
		const uri = `${this.config.uri}/${this.domain}`;
		return this.http.post<Project>(uri, JSON.stringify(project), {headers: this.headers})
	}

	// PUT
	update(project: Project): Observable<Project> {
		const uri = `${this.config.uri}/${this.domain}/${project.id}`;
		const toUpdate = {
			name: project.name,
			coverImg: project.coverImg,
			desc: project.desc
		}
		return this.http.patch<Project>(uri, JSON.stringify(toUpdate), {headers: this.headers})
	}

	// DELETE
	del(project: Project): Observable<Project> {
		const delTasks$ = Observable.from(project.taskLists ? project.taskLists : [])
			.mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
			.count();
		const uri = `${this.config.uri}/${this.domain}/${project.id}`;
		return delTasks$.switchMap(
			p => this.http
				.delete(uri)
				.map(_ => project)
		)
	}

	// GET
	get(userId: string): Observable<Project[]> {
		const uri = `${this.config.uri}/${this.domain}`;
		const params = new HttpParams().set('members_like', userId);
		return this.http.get<Project[]>(uri, {params: params, headers: this.headers})
	}
}