export type PromptNudgeSession = {
    on(event: "ready", listener: () => void): unknown;
    on(event: "close", listener: () => void): unknown;
    write(data: string): boolean;
};

export function attachLocalPromptNudge(
    session: PromptNudgeSession,
    delayMs: number = 400,
    promptInput: string = "\r"
): () => void {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const clearTimer = () => {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
    };

    session.on("ready", () => {
        clearTimer();
        timer = setTimeout(() => {
            session.write(promptInput);
        }, delayMs);
    });

    session.on("close", clearTimer);

    return clearTimer;
}