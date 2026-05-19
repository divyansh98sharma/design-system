/** A small icon button rendered in the panel header or footer. */
export interface AiPanelAction {
  /** SVG `<path d>` data (viewBox 0 0 24 24). */
  iconPath: string;
  /** Accessible label — also used as the tooltip / `aria-label`. */
  label: string;
}

/**
 * An action rendered to the right of an `<ds-ai-panel-section>` header
 * or `<ds-ai-panel-tile>` header. Three shapes:
 *
 * - `{ kind: 'icon' }`     — square 24×24 icon button.
 * - `{ kind: 'text' }`     — plain text link (no border, no background).
 * - `{ kind: 'button' }`   — labelled button optionally followed by an arrow.
 */
export type AiPanelInlineAction =
  | {
      kind: 'icon';
      iconPath: string;
      label: string;
    }
  | {
      kind: 'text';
      label: string;
    }
  | {
      kind: 'button';
      label: string;
      iconPath?: string;
      iconPosition?: 'leading' | 'trailing';
    };
