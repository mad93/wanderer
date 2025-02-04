import { Integration } from "$lib/models/integration";
import { pb } from "$lib/pocketbase";
import { APIError } from "$lib/util/api_util";
import { type ListResult } from "pocketbase";
import { writable, type Writable } from "svelte/store";

export const integrations: Writable<Integration[]> = writable([])

export async function integrations_index(f: (url: RequestInfo | URL, config?: RequestInit) => Promise<Response> = fetch) {
    let r = await f('/api/v1/integration' + new URLSearchParams({
    }), {
        method: 'GET',
    })

    if (!r.ok) {
        const response = await r.json();
        throw new APIError(r.status, response.message, response.detail)
    }

    const fetchedIntegrations: ListResult<Integration> = await r.json();

    integrations.set(fetchedIntegrations.items);

    return fetchedIntegrations.items;
}

export async function integrations_create(integration: Integration) {
    if (!pb.authStore.model) {
        throw new Error("Unauthenticated");
    }

    integration.user = pb.authStore.model!.id;

    let r = await fetch('/api/v1/integration', {
        method: 'PUT',
        body: JSON.stringify(integration),
    })

    if (!r.ok) {
        const response = await r.json();
        throw new APIError(r.status, response.message, response.detail)
    }

    const model: Integration = await r.json();

    return model;
}

export async function integrations_update(integration: Integration, f: (url: RequestInfo | URL, config?: RequestInit) => Promise<Response> = fetch) {
    let r = await f('/api/v1/integration/' + integration.id, {
        method: 'POST',
        body: JSON.stringify(integration),
    })

    if (!r.ok) {
        const response = await r.json();
        throw new APIError(r.status, response.message, response.detail)
    }

    const model: Integration = await r.json();

    return model;
}

export async function integrations_delete(integration: Integration) {
    const r = await fetch('/api/v1/integration/' + integration.id, {
        method: 'DELETE',
    })

    if (!r.ok) {
        const response = await r.json();
        throw new APIError(r.status, response.message, response.detail)
    }
}