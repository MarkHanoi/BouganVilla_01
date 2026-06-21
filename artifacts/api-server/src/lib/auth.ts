import { getPool } from "./db.js";
import { randomBytes, createHash } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

export const SESSION_COOKIE = "bv_admin_session";
const SESSION_DURATION_HOURS = 24;

export function hashPassword(password: string): string {
  const salt = process.env.ADMIN_SALT ?? "bv_salt_default";
  return createHash("sha256").update(password + salt).digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword) {
    return candidate === adminPassword;
  }
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (adminHash) {
    return hashPassword(candidate) === adminHash;
  }
  return false;
}

export async function createSession(ip: string): Promise<string> {
  const pool = getPool();
  const id = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000);
  await pool.query(
    `INSERT INTO admin_sessions (id, expires_at, ip) VALUES ($1, $2, $3)`,
    [id, expiresAt.toISOString(), ip]
  );
  return id;
}

export async function validateSession(sessionId: string): Promise<boolean> {
  if (!sessionId) return false;
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT id FROM admin_sessions WHERE id = $1 AND expires_at > now()`,
    [sessionId]
  );
  return rows.length > 0;
}

export async function deleteSession(sessionId: string): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM admin_sessions WHERE id = $1`, [sessionId]);
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies?.[SESSION_COOKIE] ?? req.headers["x-admin-session"] ?? "";
  const valid = await validateSession(sessionId as string);
  if (!valid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
