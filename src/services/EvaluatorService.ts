import path from 'path';
import { Service } from "typedi";
import { Rae } from 'relational-algebra-evaluator';
import { ConfigService } from "../libs/ConfigService";
import { HttpError, UnauthorizedError } from 'routing-controllers';

@Service()
export class EvaluatorService {
	public constructor(private configService: ConfigService) {}

	public getSessionId(): string {
		const raeDataDir = path.resolve(__dirname, '../', '../', this.configService.get<string>('RAE_DATA_DIR'))+path.sep;
		const rae = Rae.getInstance({ dataDir: raeDataDir});
		const sessionId = rae.getSessionId();
		if(!sessionId) {
			throw new HttpError(500, 'Failed to generate session');
		}
		return sessionId;
	}

	public evaluate(text: string, sessionId: string): any {
		const raeDataDir = path.resolve(__dirname, '../', '../', this.configService.get<string>('RAE_DATA_DIR'))+path.sep;
		if(!sessionId) {
			throw new UnauthorizedError('Invalid session Id')
		}
		const rae = Rae.getInstance({ sessionId, dataDir: raeDataDir});
		return rae.execute(text);
	}

	public getAllRelations(sessionId: string): string[] {
		const raeDataDir = path.resolve(__dirname, '../', '../', this.configService.get<string>('RAE_DATA_DIR'))+path.sep;
		const rae = Rae.getInstance({ sessionId, dataDir: raeDataDir});
		return rae.getAllRelations();
	}

	public addRelations(sessionId: string, relations: string): boolean {
		const raeDataDir = path.resolve(__dirname, '../', '../', this.configService.get<string>('RAE_DATA_DIR'))+path.sep;
		const raw = Rae.getInstance({ sessionId, dataDir: raeDataDir });
		return raw.addRelations(relations);
	}
}