/**
 * Lightweight WebSocket client wrapper for live market data.
 *
 * The Forecaxt gateway speaks JSON over a single connection multiplexed by
 * channel name. Consumers subscribe with `client.subscribe("price", id, cb)`
 * and receive structured events.
 *
 * Stubbed during development; replace with a real WS URL in production.
 */
export type WsChannel = "price" | "trades" | "book";

export interface WsEvent {
  channel: WsChannel;
  marketId: string;
  payload: unknown;
}

export class ForecaxtSocket {
  private listeners = new Map<string, Set<(e: WsEvent) => void>>();

  constructor(private readonly url: string = "wss://forecaxt.com/ws") {}

  subscribe(channel: WsChannel, marketId: string, cb: (e: WsEvent) => void): () => void {
    const key = `${channel}:${marketId}`;
    let set = this.listeners.get(key);
    if (!set) {
      set = new Set();
      this.listeners.set(key, set);
    }
    set.add(cb);
    return () => set?.delete(cb);
  }

  // NOTE: In production, connect() opens a WebSocket and dispatches events to
  // listeners keyed by `${channel}:${marketId}`. Left as a no-op for the stub.
  connect(): void {
    if (typeof window === "undefined") return;
  }
}
