import type { SummitLog } from '$lib/models/summit_log';
import { pb } from '$lib/pocketbase';
import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
    const filter = event.url.searchParams.get('filter') ?? ""

    try {
        const r: SummitLog[] = await pb.collection('summit_logs').getFullList<SummitLog>({
            expand: "trails_via_summit_logs.category",
            sort: "+date",
            filter: filter
        })
        return json(r)
    } catch (e: any) {
        throw error(e.status, e);
    }
}

export async function PUT(event: RequestEvent) {
    const data = await event.request.json();

    try {
        const r = await pb.collection('summit_logs').create<SummitLog>(data)
        return json(r);
    } catch (e: any) {
        throw error(e.status, e)
    }
}
