import type { DocumentData, DocumentSnapshot, Query } from 'firebase/firestore';
import { collection } from 'rxfire/firestore';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function snapToData<T = DocumentData>(
	snapshot: DocumentSnapshot<T>,
	options: { idField?: string }
): object | undefined {
	if (options === void 0) {
		options = {};
	}
	// TODO clean up the typings
	var data = snapshot.data();
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
