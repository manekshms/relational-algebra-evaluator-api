import { Request } from "express";
import { Body, Get, HttpCode, JsonController, Post, Req, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { SessionMiddleware } from "../middlewares/SessionMiddleware";
import uploadRelations from "../middlewares/uploads/uploadRelations";
import { EvaluatorService } from "../services/EvaluatorService";

import { EvaluateReqData } from "./types/EvaluatorControllerTypes";

@Service()
@JsonController('/evaluate')
export class EvaluatorController {

	public constructor(private evaluatorService: EvaluatorService){}

	@Get('/get-session-id')
	public getSessionId(): { sessionId: string } {
		const sessionId = this.evaluatorService.getSessionId();
		return { sessionId };
	}

	@Post('/run')
	@UseBefore(SessionMiddleware({ strict: true}))
	public async evaluate(
		@Body() data: EvaluateReqData,
		@Req() req: Request
	) {
		const sessionId = req.sessionId as string;
		const result = this.evaluatorService.evaluate(data.text, sessionId);
		return result;
	}

	@Get('/relations')
	@UseBefore(SessionMiddleware({ strict: true}))
	public getAllRelations(
		@Req() req: Request
	): { relations: string[]} {
		const sessionId = req.sessionId as string;
		const relations = this.evaluatorService.getAllRelations(sessionId);
		return { relations };
	}

	@Post('/add-relations')
	@UseBefore(SessionMiddleware({ strict: true}))
	@UseBefore(uploadRelations().single('relations'))
	@HttpCode(204)
	public addRelations(
		@Req() req: Request
	): void {
		console.log("Test");
		const relationData = req.file?.buffer.toString('utf8') as string;
		console.log(relationData);
		const sessionId = req.sessionId as string;
		this.evaluatorService.addRelations(sessionId, relationData);
		return;
	}
}