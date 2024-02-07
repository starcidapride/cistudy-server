import { Injectable } from "@nestjs/common"
import { InjectQueue } from "@nestjs/bull"
import { Queue } from "bull"
import ProcessMpegDashService from "./process-mpeg-dash.service"
import { QUEUE_NAME } from "./process-mpeg-dash.constants"
import { AnyFile } from "@common"

@Injectable()
export default class ProcessMpegDashProducer {
    constructor(
    private readonly mpegDashProcessorService: ProcessMpegDashService,
    @InjectQueue(QUEUE_NAME) private readonly convertQueue: Queue,
    ) {}

    async add(file: AnyFile) {
        const metadata = await this.mpegDashProcessorService.createTask(file)
        await this.convertQueue.add(metadata)
        //await this.mpegDashProcessorService.processVideo(metadata)
        return metadata
    }
}
