import { Body, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";

import { ProcessTextReqData } from "./types/EvaluatorControllerTypes";

@Service()
@JsonController('/evaluate')
export class EvaluatorController {

	@Post('/')
	public processText(
		@Body() data: ProcessTextReqData
	): ProcessTextReqData {
		return data;
	}
}