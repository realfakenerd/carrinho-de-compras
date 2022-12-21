import {
    onSnapshot,
    type DocumentData,
    type DocumentSnapshot,
    type Query
} from 'firebase/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function snapToData<T = DocumentData>(
	snapshot: DocumentSnapshot<T>,
	options: { idField?: string }
): T | undefined {
	if (options === void 0) {
		options = {};
	}
	// TODO clean up the typings
	const data = snapshot.data();
	// match the behavior of the JS SDK when the snapshot doesn't exist
	// it's possible with data converters too that the user didn't return an object
	if (!snapshot.exists() || typeof data !== 'object' || data === null) {
		return data;
	}
	if (options.idField) {
		data[options.idField] = snapshot.id;
	}
	return data;
}

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_OPTIONS = { includeMetadataChanges: false };
function fromRef(ref, options) {
	if (options === void 0) {
		options = DEFAULT_OPTIONS;
	}
	/* eslint-enable @typescript-eslint/no-explicit-any */
	return new Observable(function (subscriber) {
		const unsubscribe = onSnapshot(ref, options, {
			next: subscriber.next.bind(subscriber),
			error: subscriber.error.bind(subscriber),
			complete: subscriber.complete.bind(subscriber)
		});
		return { unsubscribe: unsubscribe };
	});
}

/**
 * Return a stream of document snapshots on a query. These results are in sort order.
 * @param query
 */
function collection(query) {
	return fromRef(query, { includeMetadataChanges: true }).pipe(
		map(function (changes) {
			return changes.docs;
		})
	);
}

/**
 * Returns a stream of documents mapped to their data payload, and optionally the document ID
 * @param query
 */
export function collectionData<T = DocumentData>(
	query: Query<T>,
	options?: { idField?: string }
): Observable<T[]> {
	if (options === void 0) {
		options = {};
	}
	return collection(query).pipe(
		map(function (arr) {
			return arr.map(function (snap) {
				return snapToData(snap, options);
			});
		})
	);
}
