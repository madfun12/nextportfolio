"use client";

import React from "react";

/*
 * Retro CRT terminal — ported from the Claude Design handoff (Terminal.dc.html).
 * The prototype was a DCLogic class component; this is a faithful React port with
 * the site's real content (about / projects / blog / contact) migrated in.
 */

const FONT = "var(--font-vt323), 'VT323', monospace";

type Kind = "dim" | "bold" | "err" | "tight" | "link" | undefined;

interface Line {
    text: string;
    style: React.CSSProperties;
}

interface Palette {
    fg: string;
    glow: string;
    bg: string;
    tintA: string;
    tintB: string;
}

interface TerminalProps {
    phosphor?: string;
}

interface TerminalState {
    lines: Line[];
    input: string;
    booted: boolean;
    hist: string[];
    histIdx: number;
    mode: "term" | "mandel";
    mcx: number;
    mcy: number;
    mscale: number;
    mrows: string[];
    mmax: number;
}

export default class CrtTerminal extends React.Component<
    TerminalProps,
    TerminalState
> {
    inputRef = React.createRef<HTMLInputElement>();
    scrollRef = React.createRef<HTMLDivElement>();
    private _timers: ReturnType<typeof setTimeout>[] = [];
    readonly MCOLS = 104;
    readonly MROWS = 44;
    readonly MASPECT = 0.52;

    constructor(props: TerminalProps) {
        super(props);
        this.state = {
            lines: [],
            input: "",
            booted: false,
            hist: [],
            histIdx: -1,
            mode: "term",
            mcx: -0.6,
            mcy: 0,
            mscale: 3.2,
            mrows: [],
            mmax: 0,
        };
    }

    pal(): Palette {
        const p = (this.props.phosphor || "green").toLowerCase();
        if (p === "amber")
            return {
                fg: "#ffb44d",
                glow: "rgba(255,150,20,0.75)",
                bg: "#140d02",
                tintA: "#1c1204",
                tintB: "#0a0700",
            };
        if (p === "white" || p === "grey" || p === "gray")
            return {
                fg: "#e6f1ff",
                glow: "rgba(190,215,255,0.6)",
                bg: "#0a0d12",
                tintA: "#111722",
                tintB: "#05070a",
            };
        if (p === "cyan" || p === "blue")
            return {
                fg: "#5be7ff",
                glow: "rgba(30,190,230,0.7)",
                bg: "#031014",
                tintA: "#06181f",
                tintB: "#010a0d",
            };
        return {
            fg: "#5bff9e",
            glow: "rgba(20,255,110,0.7)",
            bg: "#04140a",
            tintA: "#0a2013",
            tintB: "#020a05",
        };
    }

    componentDidMount() {
        this.boot();
    }

    componentWillUnmount() {
        this._timers.forEach(clearTimeout);
    }

    componentDidUpdate() {
        const el = this.scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }

    boot() {
        const seq: { t: string; v?: string; k?: Kind; d?: number }[] = [
            { t: "text", v: "CRT-DOS v3.4  (c) 1987 Funderburk Systems" },
            { t: "text", v: "BIOS check .......... OK", d: 180 },
            { t: "text", v: "64K RAM ............. OK", d: 120 },
            { t: "text", v: "PHOSPHOR TUBE ....... WARM", d: 160 },
            { t: "text", v: "Loading portfolio.sys", d: 220 },
            { t: "text", v: " " },
            { t: "banner" },
            { t: "text", v: " " },
            {
                t: "text",
                v: "  terminal startup complete",
                k: "dim",
            },
            { t: "text", v: " " },
            {
                t: "text",
                v: "  type  help  and press ↵ to see what i can do.",
                k: "bold",
            },
            { t: "text", v: " " },
        ];
        let acc = 260;
        seq.forEach((s) => {
            acc += s.d || 90;
            this._timers.push(
                setTimeout(() => {
                    if (s.t === "banner") this.pushBanner();
                    else this.push(s.v as string, s.k);
                }, acc)
            );
        });
        this._timers.push(
            setTimeout(() => {
                this.setState({ booted: true });
                if (this.inputRef.current) this.inputRef.current.focus();
            }, acc + 160)
        );
    }

    styleFor(kind?: Kind): React.CSSProperties {
        const b: React.CSSProperties = {
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            minHeight: "1.18em",
        };
        if (kind === "dim") return { ...b, opacity: 0.62 };
        if (kind === "bold")
            return { ...b, filter: "brightness(1.4)", letterSpacing: "0.3px" };
        if (kind === "err") return { ...b, opacity: 0.85, filter: "brightness(1.15)" };
        if (kind === "tight") return { ...b, lineHeight: "1.02", opacity: 0.95 };
        if (kind === "link")
            return { ...b, textDecoration: "underline", filter: "brightness(1.3)" };
        return b;
    }

    push(text: string, kind?: Kind) {
        this.setState((s) => ({
            lines: [
                ...s.lines,
                { text: text === "" ? " " : text, style: this.styleFor(kind) },
            ],
        }));
    }

    pushBlock(arr: string[], kind?: Kind) {
        const add = arr.map((t) => ({
            text: t === "" ? " " : t,
            style: this.styleFor(kind || "tight"),
        }));
        this.setState((s) => ({ lines: [...s.lines, ...add] }));
    }

    pushBanner() {
        const rule = "  ┌" + "─".repeat(40) + "┐";
        const rule2 = "  └" + "─".repeat(40) + "┘";
        this.pushBlock(
            [
                rule,
                "      M A D I S O N   F U N D E R B U R K",
                "        · developer · guthrie, ok ·",
                rule2,
            ],
            "bold"
        );
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({ input: e.target.value });

    onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (this.state.mode === "mandel") {
            this.mandelKey(e);
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            this.run(this.state.input);
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const h = this.state.hist;
            if (!h.length) return;
            const idx =
                this.state.histIdx < 0
                    ? h.length - 1
                    : Math.max(0, this.state.histIdx - 1);
            this.setState({ histIdx: idx, input: h[idx] });
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const h = this.state.hist;
            if (this.state.histIdx < 0) return;
            const idx = this.state.histIdx + 1;
            if (idx >= h.length) {
                this.setState({ histIdx: -1, input: "" });
            } else this.setState({ histIdx: idx, input: h[idx] });
            return;
        }
        if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            this.clear();
        }
    };

    focusScreen = () => {
        if (this.inputRef.current) this.inputRef.current.focus();
    };

    clear() {
        this.setState({ lines: [] });
    }

    go(url: string) {
        if (typeof window !== "undefined") window.location.href = url;
    }

    run(raw: string) {
        const cmd = (raw || "").trim();
        this.push("guest@madison:~$ " + cmd, "bold");
        const parts = cmd.split(/\s+/);
        const name = (parts[0] || "").toLowerCase();
        const arg = cmd.slice(name.length).trim();
        const nextHist = cmd ? [...this.state.hist, cmd] : this.state.hist;
        this.setState({ input: "", hist: nextHist, histIdx: -1 });
        if (!cmd) return;
        const fn = this.cmds()[name];
        if (fn) fn(arg);
        else this.push("command not found: " + name + "   (try 'help')", "err");
    }

    cmds(): Record<string, (arg?: string) => void> {
        return {
            help: () => {
                this.pushBlock([
                    " available commands:",
                    "   about      who i am",
                    "   projects   things i've built  (open <n> to launch)",
                    "   blog       things i've written  (read <n> to open)",
                    "   contact    how to reach me",
                    "   resume     download my resume (.txt)",
                    "   ls         list files",
                    "   clear      wipe the screen  (ctrl+l)",
                    " ",
                ]);
            },
            about: () => {
                this.pushBlock([
                    " ~/about.txt ------------------------------------",
                    " ",
                    " madison funderburk",
                    " developer · guthrie, ok",
                    " ",
                    " hello, i'm madison — a developer in guthrie,",
                    " oklahoma. i'm primarily self-taught, which mostly",
                    " means i read a lot of books by smarter people.",
                    " ",
                    " my focus is learning as much as possible about",
                    " software engineering; i consider it a life-long",
                    " journey. i love building easy-to-use, accessible,",
                    " and beautiful applications that put the user first.",
                    " ",
                    " i've done my share of machine learning, mobile",
                    " development, and graphic design — the right tool",
                    " for the job, and i enjoy learning new ones.",
                    " ",
                    " off the clock: working on my 100-year-old house,",
                    " time with my wife and two dogs, being bad at golf,",
                    " and photographing architecture around town.",
                    " ",
                ]);
            },
            projects: () => {
                this.pushBlock([
                    " ~/projects ------------------------------------",
                    " ",
                    " [1] mandelbrot explorer",
                    "     zoomable fractal renderer.",
                    "     → 'open 1'  (or run 'mandelbrot' right here)",
                    " ",
                ]);
            },
            open: (a) => {
                const map: Record<string, string> = {
                    "1": "/mandelbrot-explorer/index.html",
                };
                const url = map[(a || "").trim()];
                if (!url) {
                    this.push(
                        "open: usage: open 1   (try 'projects')",
                        "err"
                    );
                    return;
                }
                this.push(" opening " + url + " ...", "dim");
                this.go(url);
            },
            blog: () => {
                this.pushBlock([
                    " ~/blog ----------------------------------------",
                    " ",
                    " [1] 2024-04-11  52 projects wk2: mandelbrot explorer",
                    " [2] 2024-04-06  52 projects wk1: sudoku solver",
                    " [3] 2023-11-01  how to use nodemailer with nextjs 13",
                    " ",
                    " → type 'read <n>' to open a post",
                    " ",
                ]);
            },
            read: (a) => {
                const map: Record<string, string> = {
                    "1": "mandelbrot_explorer",
                    "2": "sudoku_solver",
                    "3": "nodemail_next_13",
                };
                const id = map[(a || "").trim()];
                if (!id) {
                    this.push("read: usage: read <1-3>   (try 'blog')", "err");
                    return;
                }
                this.push(" loading post ...", "dim");
                this.go("/posts/" + id);
            },
            contact: () => {
                this.pushBlock(
                    [
                        " ~/contact.txt ---------------------------------",
                        " ",
                        "   instagram   instagram.com/madfunphotography",
                        "   github      github.com/madfun12",
                        "   location    guthrie, ok",
                        " ",
                    ],
                    "link"
                );
            },
            resume: () => {
                this.pushBlock([
                    " compiling resume ...",
                    " > madison-funderburk-resume.txt   [ 4.1K ]",
                    " download starting. check your dock.",
                ]);
                this.download();
            },
            ls: () => {
                this.pushBlock([
                    " about.txt   projects/   blog/   contact.txt",
                    " resume.txt  secrets/    .hidden",
                ]);
            },
            cat: (a) => {
                if (a === "about.txt") return this.cmds().about();
                if (a === "contact.txt") return this.cmds().contact();
                if (a === ".hidden")
                    return this.push(
                        "  you found it. hi :)  — the answer is 42.",
                        "bold"
                    );
                this.push("cat: " + (a || "") + ": no such file", "err");
            },
            cd: () => {
                this.push("nice try. this filesystem is for looks.", "dim");
            },
            whoami: () => {
                this.push("  you are a curious visitor. i respect that.", "bold");
            },
            sudo: () => {
                this.pushBlock(
                    [
                        " [sudo] password for guest:",
                        " permission denied. you're a guest, guest.",
                        " (but i admire the ambition)",
                    ],
                    "dim"
                );
            },
            coffee: () => {
                this.pushBlock(
                    [
                        " brewing ...",
                        "         ( (",
                        "          ) )",
                        "       .______.",
                        "       |      |]",
                        "       \\      /",
                        "        `----'",
                        " HTTP 418: i'm a teapot. still, enjoy.  ☕",
                    ],
                    "tight"
                );
            },
            date: () => {
                this.push("  " + new Date().toString());
            },
            echo: (a) => {
                this.push("  " + (a || ""));
            },
            clear: () => {
                this.clear();
            },
            matrix: () => {
                const rows: string[] = [];
                const g = "01アツノマミ";
                for (let i = 0; i < 8; i++) {
                    let r = " ";
                    for (let j = 0; j < 46; j++)
                        r += g[Math.floor(Math.random() * g.length)];
                    rows.push(r);
                }
                this.pushBlock(rows, "tight");
                this.push("  wake up, visitor.", "bold");
            },
            credits: () => {
                this.pushBlock(
                    [
                        " built by madison funderburk.",
                        " phosphor, scanlines & jitter, hand-tuned.",
                        " no monitors were harmed.",
                    ],
                    "dim"
                );
            },
            mandelbrot: () => {
                this.launchMandel();
            },
        };
    }

    download() {
        try {
            const txt = [
                "MADISON FUNDERBURK",
                "Developer  ·  Guthrie, OK",
                "instagram.com/madfunphotography  ·  github.com/madfun12",
                "",
                "SUMMARY",
                "Self-taught developer treating software engineering as a",
                "life-long journey. I build easy-to-use, accessible, and",
                "beautiful applications that put the user first.",
                "",
                "SKILLS",
                "Machine learning · mobile development · graphic design.",
                "The right tool for the job — and happy to learn new ones.",
                "",
                "SELECTED WORK",
                "• Mandelbrot Explorer — infinitely-zoomable fractal renderer.",
                "• Sudoku Solver — backtracking solver for any grid.",
                "• Trivia Game, OpenAI FAQ Builder, UI Component Builder.",
                "",
                "(This resume was generated by the terminal. Say hi!)",
            ].join("\n");
            const blob = new Blob([txt], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "madison-funderburk-resume.txt";
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 2000);
        } catch {
            this.push(" download blocked by browser. copy contact instead.", "err");
        }
    }

    launchMandel() {
        this.push(" launching mandelbrot explorer ...", "dim");
        this.setState({ mode: "mandel", mcx: -0.6, mcy: 0, mscale: 3.2 }, () =>
            this.computeMandel()
        );
    }

    exitMandel() {
        this.setState({ mode: "term" }, () => {
            if (this.inputRef.current) this.inputRef.current.focus();
        });
        this.push(" exited explorer. z ← z² + c", "dim");
    }

    computeMandel() {
        const { mcx, mcy, mscale } = this.state;
        const cols = this.MCOLS,
            rows = this.MROWS,
            aspect = this.MASPECT;
        const chars = " .:-=+*oO#%@";
        const rpc = mscale / cols,
            rpr = rpc / aspect;
        const x0 = mcx - (rpc * cols) / 2,
            y0 = mcy - (rpr * rows) / 2;
        const maxIter = Math.max(
            90,
            Math.min(900, Math.round(80 + Math.log2(3.5 / mscale) * 60))
        );
        const out: string[] = [];
        for (let j = 0; j < rows; j++) {
            let row = "";
            const ci = y0 + j * rpr;
            for (let i = 0; i < cols; i++) {
                const cr = x0 + i * rpc;
                let zx = 0,
                    zy = 0,
                    it = 0;
                while (zx * zx + zy * zy <= 4 && it < maxIter) {
                    const t = zx * zx - zy * zy + cr;
                    zy = 2 * zx * zy + ci;
                    zx = t;
                    it++;
                }
                if (it >= maxIter) row += " ";
                else
                    row += chars[1 + Math.floor((it / maxIter) * (chars.length - 2))];
            }
            out.push(row);
        }
        this.setState({ mrows: out, mmax: maxIter });
    }

    panMandel(dx: number, dy: number) {
        const step = this.state.mscale * 0.18;
        this.setState(
            (s) => ({ mcx: s.mcx + dx * step, mcy: s.mcy + dy * step }),
            () => this.computeMandel()
        );
    }

    zoomMandel(f: number) {
        this.setState(
            (s) => ({ mscale: Math.min(4, s.mscale * f) }),
            () => this.computeMandel()
        );
    }

    mandelKey(e: React.KeyboardEvent<HTMLInputElement>) {
        const k = e.key;
        if (k === "q" || k === "Escape") {
            e.preventDefault();
            this.exitMandel();
            return;
        }
        if (k === "+" || k === "=" || k === "i") {
            e.preventDefault();
            this.zoomMandel(0.65);
            return;
        }
        if (k === "-" || k === "_" || k === "o") {
            e.preventDefault();
            this.zoomMandel(1 / 0.65);
            return;
        }
        if (k === "ArrowLeft") {
            e.preventDefault();
            this.panMandel(-1, 0);
            return;
        }
        if (k === "ArrowRight") {
            e.preventDefault();
            this.panMandel(1, 0);
            return;
        }
        if (k === "ArrowUp") {
            e.preventDefault();
            this.panMandel(0, -1);
            return;
        }
        if (k === "ArrowDown") {
            e.preventDefault();
            this.panMandel(0, 1);
            return;
        }
        if (k === "r") {
            e.preventDefault();
            this.setState({ mcx: -0.6, mcy: 0, mscale: 3.2 }, () =>
                this.computeMandel()
            );
            return;
        }
    }

    onMandelClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const fx = (e.clientX - rect.left) / rect.width;
        const fy = (e.clientY - rect.top) / rect.height;
        const cols = this.MCOLS,
            rows = this.MROWS,
            aspect = this.MASPECT;
        const rpc = this.state.mscale / cols,
            rpr = rpc / aspect;
        const viewW = rpc * cols,
            viewH = rpr * rows;
        this.setState(
            (s) => ({
                mcx: s.mcx + (fx - 0.5) * viewW,
                mcy: s.mcy + (fy - 0.5) * viewH,
                mscale: s.mscale * 0.55,
            }),
            () => {
                this.computeMandel();
                if (this.inputRef.current) this.inputRef.current.focus();
            }
        );
    };

    render() {
        const c = this.pal();
        const zoomX = 3.2 / this.state.mscale;
        const zoomLabel =
            zoomX >= 1000
                ? (zoomX / 1000).toFixed(1) + "k"
                : zoomX >= 100
                ? Math.round(zoomX)
                : zoomX.toFixed(1);
        const mHud =
            " MANDELBROT  ·  ×" +
            zoomLabel +
            "  ·  c = " +
            this.state.mcx.toFixed(4) +
            " + " +
            this.state.mcy.toFixed(4) +
            "i  ·  iter " +
            this.state.mmax;
        const mHint =
            " [click] zoom in   [+ /-] zoom   [↑↓←→] pan   [r] reset   [q] quit";

        const base: React.CSSProperties = {
            fontFamily: FONT,
            fontSize: "20px",
            lineHeight: 1.18,
            color: c.fg,
            textShadow: "0 0 1px " + c.glow + ", 0 0 8px " + c.glow,
        };

        const screenStyle: React.CSSProperties = {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            background:
                "radial-gradient(120% 120% at 50% 45%, " +
                c.tintA +
                " 0%, " +
                c.bg +
                " 62%, " +
                c.tintB +
                " 100%)",
            boxShadow:
                "inset 0 0 90px 12px rgba(0,0,0,0.9), inset 0 0 22px 2px rgba(0,0,0,0.7)",
            cursor: "text",
        };
        const powerStyle: React.CSSProperties = {
            position: "absolute",
            inset: 0,
            animation: "crt-power 1400ms ease-out both",
            transformOrigin: "center",
        };
        const contentStyle: React.CSSProperties = {
            ...base,
            position: "absolute",
            inset: 0,
            padding: "26px 30px 30px",
            overflowY: "auto",
            animation:
                "crt-jitter 220ms steps(2) infinite, crt-flicker 4.5s steps(12) infinite",
            WebkitFontSmoothing: "none",
        };
        const cursorStyle: React.CSSProperties = {
            display: "inline-block",
            width: "0.62ch",
            background: c.fg,
            boxShadow: "0 0 8px " + c.glow,
            animation: "crt-blink 1.05s steps(1) infinite",
            marginLeft: "1px",
            alignSelf: "center",
            height: "1.05em",
        };
        const scanlineStyle: React.CSSProperties = {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 5,
            background:
                "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.30) 3px, rgba(0,0,0,0.30) 4px)",
            mixBlendMode: "multiply",
        };
        const vignetteStyle: React.CSSProperties = {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 7,
            background:
                "radial-gradient(130% 130% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        };
        const flickerStyle: React.CSSProperties = {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 8,
            background:
                "radial-gradient(60% 52% at 50% 44%, " +
                c.glow +
                " 0%, rgba(0,0,0,0) 68%)",
            opacity: 0.12,
            mixBlendMode: "screen",
        };
        const mandelStyle: React.CSSProperties = {
            position: "absolute",
            inset: 0,
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background:
                "radial-gradient(120% 120% at 50% 45%, " +
                c.tintA +
                " 0%, " +
                c.bg +
                " 70%, " +
                c.tintB +
                " 100%)",
            padding: "14px 10px",
            boxSizing: "border-box",
            overflow: "hidden",
            color: c.fg,
            textShadow: "0 0 1px " + c.glow + ", 0 0 7px " + c.glow,
            fontFamily: FONT,
        };
        const mandelHudStyle: React.CSSProperties = {
            fontSize: "18px",
            lineHeight: 1.2,
            filter: "brightness(1.35)",
            letterSpacing: "0.4px",
            flex: "0 0 auto",
            textAlign: "center",
            whiteSpace: "pre-wrap",
            padding: "0 6px",
        };
        const mandelArtStyle: React.CSSProperties = {
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            cursor: "crosshair",
            width: "100%",
            alignItems: "center",
            padding: "8px 0",
        };
        const mandelRowStyle: React.CSSProperties = {
            whiteSpace: "pre",
            fontSize: "clamp(9px, 1.35vw, 15px)",
            lineHeight: 1.0,
            letterSpacing: "0px",
        };

        return (
            <div style={screenStyle} onClick={this.focusScreen}>
                <div style={powerStyle}>
                    <div style={contentStyle} ref={this.scrollRef}>
                        {this.state.lines.map((line, i) => (
                            <div key={i} style={line.style}>
                                {line.text}
                            </div>
                        ))}
                        {this.state.booted && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    flexWrap: "wrap",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                }}
                            >
                                <span style={{ opacity: 0.9 }}>
                                    guest@madison:~$&nbsp;
                                </span>
                                <span>{this.state.input}</span>
                                <span style={cursorStyle}>&nbsp;</span>
                            </div>
                        )}
                    </div>
                </div>

                {this.state.mode === "mandel" && (
                    <div style={mandelStyle}>
                        <div style={mandelHudStyle}>{mHud}</div>
                        <div style={mandelArtStyle} onClick={this.onMandelClick}>
                            {this.state.mrows.map((mr, i) => (
                                <div key={i} style={mandelRowStyle}>
                                    {mr}
                                </div>
                            ))}
                        </div>
                        <div style={mandelHudStyle}>{mHint}</div>
                    </div>
                )}

                <div style={scanlineStyle}></div>
                <div style={vignetteStyle}></div>
                <div style={flickerStyle}></div>

                <input
                    type="text"
                    ref={this.inputRef}
                    value={this.state.input}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-label="terminal input"
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        width: "1px",
                        height: "1px",
                        opacity: 0,
                    }}
                />
            </div>
        );
    }
}
